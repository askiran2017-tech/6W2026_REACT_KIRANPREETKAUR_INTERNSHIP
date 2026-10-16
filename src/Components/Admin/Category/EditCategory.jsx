import { Link, useParams,useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import CategoryServices from "../../../Services/CategoryServices"
export default function EditCategory() {
    const [CategoryName, setCategoryName] = useState("");
    const [Description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [CreatedAt, setCreatedAt] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const params = useParams()
    const navigate = useNavigate();


    async function updateCategory(e) {
        e.preventDefault()
        const trimmedName = CategoryName.trim();
        const trimmedDesc = Description.trim();

        if (!trimmedName) {
            toast.error("Please enter category name");
            return;
        }
        if (trimmedName.length < 2) {
            toast.error("Category name must be at least 2 characters");
            return;
        }

        if (!trimmedDesc) {
            toast.error("Please enter category description");
            return;
        }

        try {
            let payload = {
                name: trimmedName,
                description: trimmedDesc,
                status: "active",
                createdAt: CreatedAt,
                updatedAt: new Date()
            }
            console.log("Payload:", payload);
            await CategoryServices.update(params.id, payload)
            toast.success("Category updated successfully");
            navigate("/Admin/ManageCategory");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update Category")
        }
    }
    async function getCategoryDetails() {
        let res = await CategoryServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setCategoryName(res.name)
            setDescription(res.description)
            setStatus(res.status)
            setCreatedAt(res.createdAt)
            setupdatedAt(res.updatedAt)
        } else {
            toast.error("no such data")
        }
    }
    useEffect(() => {
        getCategoryDetails();
    }, [params.id]);


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Edit Category</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Edit Category
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={updateCategory} style={{ width: 800 }}>
                    
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter Category Name" value={CategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter description" value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
        


                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Edit Category
                    </button>
                </form>
            </div>

        </>
    )
}