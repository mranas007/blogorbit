const InputField = ({ name, label, type = "text", handleForm, value, error, }) => {
    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={handleForm}
                placeholder=""
                className={`
            peer w-full px-4 py-3 text-sm 
            bg-transparent border 
            ${error ? "border-red-500" : "border-gray-300 hover:border-indigo-500"}
            rounded-lg outline-none 
            transition-all duration-300
            focus:ring-2 ${error ? "focus:ring-red-200" : "focus:ring-indigo-200"}
        `}
                required
            />
            <label
                htmlFor={name}
                className={`
            absolute left-3 -top-2 bg-white px-1 text-xs
            ${error ? "text-red-500" : "text-gray-500"}
            peer-placeholder-shown:top-2.5
            peer-placeholder-shown:text-base 
            peer-focus:-top-2
            peer-focus:text-xs 
            transition-all duration-300
        `}>
                {label}
            </label>
            {error && (
                <p className="text-red-500 text-xs mt-1 pl-1">{error}</p>
            )}
        </div>
    )
}

export default InputField