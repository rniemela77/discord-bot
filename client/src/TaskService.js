// Handle all requests. Will reference this from the component
import axios from "axios";

const url = "/api/tasks";

class TaskService {
  // Get Tasks
  static getTasks() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((post) => ({
            ...post,
            // createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create Task
  static insertTask(postText) {
    return axios.post(url, { text: postText });
  }

  // Delete Task
  static deleteTask(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default TaskService;
