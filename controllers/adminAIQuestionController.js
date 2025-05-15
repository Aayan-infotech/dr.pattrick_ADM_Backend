const AdminAIGeneratedQuestion = require("../models/adminAIQuestionModel");
const axios = require("axios");

exports.getStudiesId = async (req, res) => {
    try {
        const response = await axios.get('https://clinicaltrials.gov/api/v2/studies');

        const studies = response.data.studies || [];

        const data = studies.map(study =>
            study?.protocolSection?.identificationModule?.nctId)
        .filter(id => !!id);

        res.status(200).json({ success: true, totalCount: data.length, data})
    } catch (error) {
        console.error('Error Get Studies ID', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.generateStudyQuestions = async (req, res) => {
  const studyId = req.params.studyId;

  try {
    // Step 0: Check if study questions already exist in DB
    const existing = await AdminAIGeneratedQuestion.findOne({ studyId });
   
    if (existing) {
      return res.status(200).json({ success: true, data: existing });
    }

    // Step 1: Fetch briefSummary from ClinicalTrials.gov
    const studyRes = await axios.get(
      `https://clinicaltrials.gov/api/v2/studies/${studyId}`
    );

    const briefSummary =
      studyRes.data?.protocolSection?.descriptionModule?.briefSummary;

    if (!briefSummary) {
      return res
        .status(404)
        .json({ message: "Brief summary not found in study data" });
    }

    // Step 2: Generate questions using Gemini API
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Based on this clinical study brief summary, generate 5 survey questions in the following JSON format:
  
  {
    "studyId": "${studyId}",
    "questions": [
      {
        "questionText": "....",
      },
      {
        "questionText": "....",
      },
      {
        "questionText": "....",
      },
      {
        "questionText": "....",
      },
      {
        "questionText": "....",
      }
    ]
  }
  
  Brief Summary: ${briefSummary}`,
              },
            ],
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const geminiReply =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!geminiReply) {
      return res.status(500).json({ message: "Failed to generate questions" });
    }

    // Remove any unwanted characters (like backticks)
    const cleanedResponse = geminiReply.replace(/```json\n|\n```/g, "").trim();

    // Parse JSON
    let parsed;
    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to parse generated questions" });
    }

    // Step 3: Save to MongoDB
    const saved = await AdminAIGeneratedQuestion.findOneAndUpdate(
      { studyId },
      {
        studyId,
        briefSummary,
        questions: parsed.questions,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: saved });
  } catch (error) {
    console.error("Error generating questions:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
