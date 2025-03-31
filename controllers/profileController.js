const Conditions = require('../models/profileModel');


// // Create new Condition with procedure
// exports.createConditionWithProcedure = async (req, res) => {
//     try {
//         const { conditionsName, procedure } = req.body;

//         if (!conditionsName) {
//             return res.status(400).json({ message: 'Condition name is required' });
//         }

//         if (!procedure || !Array.isArray(procedure)) {
//             return res.status(400).json({ message: 'Procedure must be an array' });
//         }

//         // Create the condition with procedure
//         const condition = new Conditions({ 
//             conditionsName, 
//             procedure: procedure.map(sub => ({ procedureName: sub.procedureName })) 
//         });

//         await condition.save();

//         res.status(201).json({ message: 'Condition and Procedure created successfully', condition });

//     } catch (error) {
//         res.status(500).json({ message: 'Error creating condition with procedure', error });
//     }
// };

// // Get All Conditions
// exports.getAllConditions = async (req, res) => {
//     try {
//         const conditions = await Conditions.find().sort({ _id: -1 });
//         let count = conditions.length;
//         res.status(201).json({ total: count, conditions });

//     } catch (error) {
//         res.status(500).json({ message: 'Error Get all Conditions', error });
//     }
// };

// // Get Condition by ID
// exports.getConditionById = async (req, res) => {
//     try {
//         const condition = await Conditions.findById(req.params.id);
//         if (!condition) {
//             return res.status(404).json({ message: 'Condition not found' });
//         }
//         res.status(200).json({ condition });

//     } catch (error) {
//         res.status(500).json({ message: 'Error getting condition by ID', error });
//     }
// };

// // Update Condition by ID
// exports.updateCondition = async (req, res) => {
//     try {
//         const { conditionsName, procedure } = req.body;

//         if (!conditionsName && !procedure) {
//             return res.status(400).json({ message: 'At least one field (conditionsName or procedure) must be provided for update' });
//         }

//         const updatedData = {};
//         if (conditionsName) updatedData.conditionsName = conditionsName;
//         if (procedure && Array.isArray(procedure)) {
//             updatedData.procedure = procedure.map(sub => ({ procedureName: sub.procedureName }));
//         }

//         const updatedCondition = await Conditions.findByIdAndUpdate(req.params.id, updatedData, { new: true });

//         if (!updatedCondition) {
//             return res.status(404).json({ message: 'Condition not found' });
//         }

//         res.status(200).json({ message: 'Condition updated successfully', updatedCondition });

//     } catch (error) {
//         res.status(500).json({ message: 'Error updating condition', error });
//     }
// };

// // Delete Condition by ID
// exports.deleteCondition = async (req, res) => {
//     try {
//         const deletedCondition = await Conditions.findByIdAndDelete(req.params.id);

//         if (!deletedCondition) {
//             return res.status(404).json({ message: 'Condition not found' });
//         }

//         res.status(200).json({ message: 'Condition deleted successfully' });

//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting condition', error });
//     }
// };

// 1
exports.createCondition = async (req, res) => {
    try {
        const { conditionsName, procedures } = req.body;

        // Create a new condition document
        const newCondition = new Conditions({
            conditionsName,
            procedures
        });

        // Save to database
        await newCondition.save();

        // Success response
        res.status(201).json({
            success: true,
            message: "Condition created successfully",
            data: newCondition
        });
    } catch (error) {
        console.error("Error creating condition:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
