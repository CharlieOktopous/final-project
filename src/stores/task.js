import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("todos", {
  state: () => ({
    todos: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: todos } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });
      this.todos = todos;
      return this.todos;
    },

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

    async deleteTask(id) {
      const { data, error } = await supabase.from("todos").delete().match({
        id: id,
      });
    },

    async toggleTaskDone(id) {
      const taskData = await supabase.from("todos").select("*").eq("id", id);
      const task = taskData.data[0]
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !task.is_complete })
        .match({
          id: id,
        });
    },
  },
});
