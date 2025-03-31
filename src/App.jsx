import { useState } from 'react'

function App() {

  /* form data */
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
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

  /* submit w/fetch */
  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: formData.author,
        title: formData.title,
        body: formData.body,
        public: formData.public,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit post");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Post submitted successfully:", result);
        setAlertMessage("Post submitted successfully!");
        setAlertType("success");
        setFormData({
          author: "",
          title: "",
          body: "",
          public: false,
        });
      }).catch((error) => {
        console.error("Error submitting post:", error);
        setAlertMessage("An error occurred. Please try again.");
        setAlertType("error");
      });
  }

  /* alerts */
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState(null)
  function dismissAlert() {
    setAlertMessage(null);
    setAlertType(null);
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



        {alertMessage && (
          <div
            style={{ width: "100%" }}
            className={`d-flex justify-content-between align-items-center alert alert-dismissible
            ${alertType === "success" ? "alert-success" : "alert-danger"}`}>

            <span className='ps-3'>{alertMessage}</span>

            <button
              type="button"
              className={`close btn ${alertType === "success" ? "btn-success" : "btn-danger"} `}
              onClick={dismissAlert}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {/* form */}
        <form className='m-0 row g-3' onSubmit={handleSubmit}>

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
            name="body"
            value={formData.body}
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

            <button type="submit" className="btn btn-primary px-5 py-0 fs-5">POST</button>
          </div>


        </form>

      </main >

      {/* footer */}
      <footer className="bg-dark text-light py-3" >
        <div className="container text-center">
          <p className="m-0">© {new Date().getFullYear()} B<span className='text-primary'>oo</span>LOG. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}

export default App