import { useDispatch, useSelector } from "react-redux";
import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { fetchTodos, deleteTodoApi, addTodoAPI, updateTodoApi, toggleTodoApi } from '../redux/actions/todoAction';
const TodoScreen = () => {
    const [title, setTitle] = useState('');

    const [editTitle, setEditTitle] = useState('');// chuỗi tiêu đề
    const [idEdit, setIdEdit] = useState(null); //lưu id bản ghi cần sửa

    //lấy  danh sách dữ liệu từ store của redux
    const listTodo = useSelector(state => state.listTodo.listTodo);
    // lấy đối tượng để điều khiển các action
    const dispatch = useDispatch();// của redux
    // khi vào ứng dụng sẽ gọi action fetchTodos để kéo dữ liệu từ API về store của redux
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleDeleteTodo = async (id) => {
        dispatch(deleteTodoApi(id))
            .then((result) => {
                console.log('Todo deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting todo:', error);
            });
    };

    const handleAddTodo = () => {
        let duLieuThem = { title: title, status: false };
        // dispatch( addTodo ( duLieuThem )  );
        dispatch(addTodoAPI(duLieuThem))
            .then((result) => {
                // console.log(result);
                console.log('Todo add successfully!');
            })
            .catch((error) => {
                console.error('Error add todo:', error);
            });
    };

    const handleEdit = (id, title) => {
        // hàm này để  ẩn hiện form sửa
        setEditTitle(title);
        setIdEdit(id);
    }
    // hàm lưu kết quả sửa
    const handleUpdate = () => {

        let duLieuUpdate = { title: editTitle };
        // dispatch( addTodo ( duLieuThem )  );

        dispatch(updateTodoApi({ id: idEdit, data: duLieuUpdate }))
            .then((result) => {
                // console.log(result);

                console.log('Todo update successfully!');
                setEditTitle('');
                setIdEdit(null);
            })
            .catch((error) => {
                console.error('Error update todo:', error);
            });
    }

    const handleToggleTodo = (id, status) => {
        // dispatch(toggleTodoStatus(id));
        console.log('status: ' + status);
        let duLieuUpdate = { status: !status };
        console.log(duLieuUpdate);
        dispatch(toggleTodoApi({ id: id, data: duLieuUpdate }))
            .then((result) => {
                // console.log(JSON.stringify(result));
                console.log('Todo update status successfully!');

            })
            .catch((error) => {
                console.error('Error update todo:', error);
            });
    };

    return (
        <View>

            <TextInput placeholder="Nhập công việc" onChangeText={setTitle} />
            <View style={{ width: 100 }}>
                <Button title="Thêm việc" onPress={handleAddTodo} />
            </View>

            {/* in danh sách todo: */}
            {
                listTodo.map(row => (
                    <View key={row.id}
                        style={{ margin: 10, padding: 10, borderColor: 'blue', borderWidth: 1 }}>

                        {
                            (idEdit === row.id) ?
                                (<>
                                    <TextInput
                                        value={editTitle}
                                        onChangeText={setEditTitle}
                                        onBlur={handleUpdate}
                                        autoFocus
                                    />
                                    <Button title="Update" onPress={handleUpdate} />
                                </>
                                )
                                :
                                (
                                    <>
                                        <Text>{row.title}  -  {row.id}</Text>
                                        <TouchableOpacity onPress={() => handleDeleteTodo(row.id)} >
                                            <Text style={{ color: 'red' }}>Xóa</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => handleToggleTodo(row.id, row.status)}>
                                            {row.status ?
                                                <Text style={{ color: 'gray' }}>Completed</Text> :
                                                <Text style={{ color: 'green' }}>Working</Text>
                                            }
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => handleEdit(row.id, row.title)}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                    </>

                                )
                        }

                    </View>
                ))
            }
        </View>
    );
}
export default TodoScreen;