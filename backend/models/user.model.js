module.exports = mongoose => {
    const UserModel = mongoose.model(
      "users",
      mongoose.Schema(
        {
          username: String,
          email: String,
          password: String,
          isAdmin: Boolean
        }
      )
    );
  
    return UserModel;
  };