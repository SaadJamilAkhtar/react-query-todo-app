import axios from 'axios';

const todosAPI = axios.create({
    baseURL: 'http://localhost:3500'
})

export const getTodos = async () => {
    const res = await todosAPI.get('/todos')
    return res.data
}

export const addTodos = async (todo) => {
    return await todosAPI.post('/todos', todo)
}

export const updateTodos = async (todo) => {
    return await todosAPI.patch(`/todos/${todo.id}`, todo)
}

export const deleteTodos = async ({id}) => {
    return await todosAPI.delete(`/todos/${id}`, id)
}

export default todosAPI;