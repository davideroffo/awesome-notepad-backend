const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

mongoose.model("Note", noteSchema);
