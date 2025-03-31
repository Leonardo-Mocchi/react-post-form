import { useState } from 'react'

function App() {

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    text: "",
    public: false,
  });

  function handleFormData(e) {
    const value =
      e.target.type === "checkbox" ?
        e.target.checked : e.target.value;
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: value,
    }));
  }

  return (
    <>
      {/* header */}
      <header className=' bg-secondary text-white'>
        <div className='mx-5 py-3 d-flex align-items-center'>

          <h1 className='m-0 fs-1'>B<span className='text-primary'>oo</span>LOG</h1>

          <p className='m-0 ms-5 pt-2 fs-5 fst-italic text-dark'>-Y<span className='text-primary'>oo</span>r own personal space</p>
        </div>
      </header>

      {/* main */}
      <main className='m-5'>

        <p className='fs-5 mb-4'>Make a post:</p>

        {/* form */}
        <form className='m-0 row g-3' action="" method="post">

          <input className='col-12'
            type="text"
            name="author"
            value={formData.author}
            onChange={handleFormData}
            placeholder="Your name" />

          <input className='col-12'
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormData}
            placeholder="Post Title" />

          <textarea className='col-12'
            name="text"
            value={formData.text}
            onChange={handleFormData}
            placeholder="Post Content"
            rows="5"
          ></textarea>

          <div className='col-12 p-0 d-flex justify-content-between'>
            <div>
              <p className='small text-secondary'>Go public?</p>
              <input className='big-checkbox'
                name="public"
                checked={formData.public}
                onChange={handleFormData}
                id="public"
                type="checkbox" />
              <label className='ms-3' htmlFor="public">Privacy set to: {formData.public ? "PUBLIC" : "PERSONAL (Draft)"}</label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </div>


        </form>

      </main>

      {/* footer */}
      <footer className="bg-dark text-light py-3">
        <div className="container text-center">
          <p className="m-0">© {new Date().getFullYear()} B<span className='text-primary'>oo</span>LOG. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}

export default App