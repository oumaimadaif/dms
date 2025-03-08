const Input = ({ label, ...props }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input {...props} className="border p-2 rounded" />
    </div>
);
export default Input;
