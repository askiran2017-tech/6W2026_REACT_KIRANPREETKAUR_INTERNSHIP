import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";

import CategoryServices from "../../../Services/CategoryServices"
export default function AddCategory() {
    const [CategoryName, setCategoryName] = useState("");
    const [Description, setDescription] = useState("");
    
      const navigate = useNavigate();


    async function AddCategory(e) {
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
                createdAt: new Date(),
                updatedAt: new Date()
            }
            console.log("Payload:", payload);
            await CategoryServices.add(payload)
            toast.success("Category added");
            navigate("/Admin/ManageCategory");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding Category")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Category</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Category
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddCategory} style={{ width: 800 }}>
                    
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter Category Name"
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        
                            <input
                                type="description"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                   
                        
                           
                    
                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Category
                    </button>
                </form>
                </div>

        </>
    )
}