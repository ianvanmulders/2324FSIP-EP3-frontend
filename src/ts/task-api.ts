// export const refreshTodos = function (): void {
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`)
//         .then((response) => {
//             return response.json() as Promise<{ tasks: Task[] }>
//         })
//         .then((todos) => {
// // Now TypeScript knows that 'todos' has the type { tasks: Task[] }
