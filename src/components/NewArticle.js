import React, { useState } from "react";
import { articlesURL } from "../utils/constant";
import { withRouter } from "react-router-dom";

function NewArticle(props) {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [body, setBody] = useState("");
  let [tags, setTags] = useState("");
  let [error, setError] = useState("");

  const handleTitle = ({ target }) => {
    let { name, value } = target;
    setTitle(value);
  };

  const handleDescription = ({ target }) => {
    let { name, value } = target;
    setDescription(value);
  };

  const handleBody = ({ target }) => {
    let { name, value } = target;
    setBody(value);
  };

  const handleTags = ({ target }) => {
    let { name, value } = target;
    setTags(value);
  };

  const handleSubmit = (event) => {
    let token = "Bearer " + localStorage.token;
    event.preventDefault();
    if (title && description && body && tags) {
      fetch(articlesURL, {
        method: "POST",
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: tags.split(",").map((tag) => tag.trim()),
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then((data) => {
          props.history.push("/articles");
        })
        .catch((err) => {
          setBody("");
          setDescription("");
          setError(err);
          setTags("");
          setTitle("");
        });
    } else {
      setBody("");
      setDescription("");
      setError("Enter all fields");
      setTags("");
      setTitle("");
    }
  };

  return (
    <main>
      <section className="pt-20 px-8">
        <form
          className="w-full md:w-1/2 md:mx-auto p-8 border border-gray-400 rounded-md"
          onSubmit={handleSubmit}
        >
          <legend className="text-2xl sm:text-3xl text-center font-bold my-3">
            Add Article
          </legend>
          <fieldset className="">
            <span className="text-red-500 my-1">{error}</span>

            <input
              type="text"
              value={title}
              placeholder="Title"
              name="title"
              onChange={handleTitle}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />

            <input
              type="text"
              value={description}
              name="description"
              placeholder="Description"
              onChange={handleDescription}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />

            <textarea
              rows="6"
              value={body}
              name="body"
              placeholder="Articles's Body"
              onChange={handleBody}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            ></textarea>

            <input
              type="text"
              value={tags}
              name="tags"
              placeholder="Tag List(comma seperated)"
              onChange={handleTags}
              className="my-2 p-2 rounded-md outline-none border-2 border-gray-300 focus:border-blue-500 w-full"
            />

            <input
              type="submit"
              value="Add Article"
              className="my-2 p-2 rounded-md outline-none bg-blue-500 hover:bg-blue-400 text-white w-full"
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default withRouter(NewArticle);