module.exports = {
  paths: {
    "/users/login": {
      get: {
        tags: {
          Tasks: "Login User",
        },
        description: "Login User",
        operationId: "getTasks",
        parameters: [],
        responses: {
          200: {
            description: "Bienvenid@",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/users",
                },
              },
            },
          },
        },
      },
    },
    "/tasks/createTask": {
      post: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: {
          Tasks: "Create a task",
        },
        description: "Create Task",
        operationId: "createTask",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TaskInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/tasks/updateTitleTask/{_id}": {
      put: {
        tags: {
          Tasks: "Update a task",
        },
        description: "Update Task",
        operationId: "updateTask",
        parameters: [
          {
            name: "_id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            description: "Id of Task to be updated",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskInput" },
            },
          },
        },
        responses: {
          200: { description: "Task updated successfully" },
          404: { description: "Task not found" },
          500: { description: "Server error" },
        },
      },
    },
    "/tasks/deleteTask/{_id}": {
      delete: {
        tags: {
          Tasks: "Delete a task",
        },
        description: "Deleting a Task",
        operationId: "deleteTask",
        parameters: [
          {
            name: "_id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            description: "Deleting a done Task",
          },
        ],
        responses: {
          200: { description: "Task deleted successfully" },
          404: { description: "Task not found" },
          500: { description: "Server error" },
        },
      },
    },
  },
};

