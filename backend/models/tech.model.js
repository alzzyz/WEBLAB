module.exports = mongoose => {
    const TechModel = mongoose.model(
      "technologies",
      mongoose.Schema(
        {
          name: String,
          category: String,
          ring: String,
          description: String,
          descriptionClassification: String,
          published: Boolean,
          publishDate: Date,
          createdAt: Date,
          createdBy: String,
          changes: [{
                user: String,
                updatedAt: Date
          }]
        }
      )
    );
  
    return TechModel;
  };