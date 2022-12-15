import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

//Manage all the functions for the todos
export const useTaskStore = defineStore("todos", {
  state: () => ({
    todos: null,
  }),
  actions: {
    async getTaskById(id) {
      const taskData = await supabase.from("todos").select("*").eq("id", id);
      const task = taskData.data[0];
      return task;
    },

    //Get all todos
    async fetchTasks() {
      const { data: todos } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });
      this.todos = todos;
      return this.todos;
    },

    //Add a new task
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("todos").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    //Delete an existing task
    async deleteTask(id) {
      const { data, error } = await supabase.from("todos").delete().match({
        id: id,
      });
    },

    //Edit an existing task
    async editTask(id, formData) {
      const task = this.getTaskById(id);  
      console.log("formData",{...formData})
      const { data, error } = await supabase
        .from("todos")
        .update({ ...formData })
        .eq("id", id);
    },

    //Mark a task as complete or incomplete
    async toggleTaskDone(id) {
      const task = this.getTaskById(id);
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !task.is_complete })
        .match({
          id: id,
        });
    },
  },
});
