import { useQuery, useMutation, useQueryClient, QueryCache, QueryClient } from 'react-query';
import { getTodos, addTodos, updateTodos, deleteTodos } from '../../api/todosAPI';
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TodoList = (props) => {
    const [newTodo, setNewTodo] = useState('');
    const queryClient = new useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data : todos
    } = useQuery('todos', getTodos, {
        select: data => data.sort((a,b) => b.id-a.id)
    });
    const addTodosMutation = useMutation(addTodos, {
        onSuccess: () => {
            // invalidates cache and refetch
            queryClient.invalidateQueries(['todos'])
        }
    })

    const updateTodosMutation = useMutation(updateTodos, {
        onSuccess: () => {
            // invalidates cache and refetch
            queryClient.invalidateQueries(['todos'])
        }
    })

    const deleteTodosMutation = useMutation(deleteTodos, {
        onSuccess: () => {
            // invalidates cache and refetch
            queryClient.invalidateQueries(['todos'])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodosMutation.mutate({userId: 1, title: newTodo, completed: false})
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor='new-todo'>Enter New Todo item</label>
            <div className='new-todo'>
                <input
                type='text'
                id='new-todo'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new todo"
                />
            </div>
            <button className='submit'>
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

    let content
    if (isLoading){
        content = (<p>Loading...</p>)
    }else if (isError) {
        content = (<p>{error.message}</p>)
    }else{
        content = todos.map(todo => {
            return (
                <article key={todo.id}>
                    <div className='todo'>
                        <input
                        type="checkbox"
                        id={todo.id}
                        checked={todo.completed}
                        onChange={() => {
                            updateTodosMutation.mutate({...todo, completed: !todo.completed})
                        }}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className='trash' onClick={() => {
                        deleteTodosMutation.mutate({id : todo.id})
                    }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    }
    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;