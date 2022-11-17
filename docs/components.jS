module.exports = {
  components: {
    schemas: {
      task: {
        type: "object",

        properties: {
          _id: {
            type: "objectId",

            description: "task identification number",

            example: "6201064b0028de7866e2b2c4",
          },

          title: {
            type: "string",

            description: "task's title",

            example: "make an excellent readme",
          },

          completed: {
            type: "boolean",

            description: "The status of the task",

            example: false,
          },
        },
      },
    },
  },
};
