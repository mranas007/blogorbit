import React from "react";

function LoadMoreButton(props) {
    return (
        <button
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 duration-300">
           {props.text}
        </button>
    );
}

export default LoadMoreButton;
