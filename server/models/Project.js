import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    },
    clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    },
    description: {
    type: String,
    required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        required: true,
    },
});

export default mongoose.model("Project", ProjectSchema);