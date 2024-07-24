import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Container, Input, Table } from "reactstrap"

function API1() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [text, setText] = useState("")
    const [isEdit, setIsEdit] = useState({ id: "", flag: false });
    const [textEdit, setTextEdit] = useState("")
    const url = "https://66a07bc07053166bcabb8e9c.mockapi.io/students"
    const getStudents = () => {
        axios.get(url)
            .then((res) => {
                console.log(res)
                setData(res.data)
                
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteStudent = (id) => {
        axios({
            method: 'delete',
            url: url + "/" + id,
        })
            .then((res) => {

                setMessage("Delete successfull")

                setData(data.filter((item) => item.id !== id))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const addStudent = (name) => {
        axios({
            method: "post",
            url: url,
            data: {
                name: name
            }
        })
            .then((res) => {
                setMessage("Add successfull")
                setData([...data, { id: res.data.id, name: name }])
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const editStudent = (id, name) => {
        axios({
            method: 'put',
            url: url + "/" + id,
            data: {
                name: name
            }
        })
            .then((res) => {
                setMessage("Edit successfull")
                setData(data.map((item) => item.id === id ? { ...item, name: name } : item))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getStudents()
    }, [])
    return (
        <div>
            <Container>
                {console.log(data)}
                <p>{message}</p>
                <h1>Student list</h1>
                <div>
                    <Input type="text" onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addStudent(text);
                            setText("")
                        }
                    }} value={text} />
                </div>
                <Table
                >
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Username
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {isEdit.id === item.id && isEdit.flag === true ? <Input type="text" value={textEdit}
                                        onChange={(e) => setTextEdit(e.target.value)} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                
                                                editStudent(item.id, textEdit);
                                                setIsEdit({id:"", flag: false})
                                                // setText("")
                                            }
                                        }} /> : 
                                        <p onDoubleClick={() => {
                                            setIsEdit({id:item.id, flag: true})
                                            setTextEdit(item.name)
                                        }
                                        }>{item.name}</p>}
                                </td>


                                <td>
                                    <Button onClick={() => deleteStudent(item.id)} className="btn btn-danger">Delete</Button>
                                    <Button className="btn btn-success">Update</Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
export default API1;