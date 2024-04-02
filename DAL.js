const {mongoose, Schema}  = require("mongoose");
connectionString = 'mongodb://localhost:27017/Ideas_DB';
collection = 'ideas';

mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongoose Connected")
});

const ideas = new Schema ({
    idea: String,
},
{ collection: ''}
);

const ideaModel = mongoose.model("idea", ideas);

exports.DAL = {
    create: (ideaBody) => {
        let Ideas = {
            idea: ideaBody
        }
        ideaModel.collection.insertOne(Ideas);
    },
    delete: async (id) => {
        await ideaModel.deleteOne({ _id: id }).exec();
        
    },
    update: async (id, data) => {
      try {
        const updatedIdea = await ideaModel.findOneAndUpdate(
          { _id: id },
          data,
          { new: true }
        );
        return updatedIdea;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getIdea: async () => {
        let filter = {};
        return await ideaModel.find(filter).exec();
    },
    getIdeaById: async (id) => {
        return await ideaModel.findById(id).exec();
    }
}