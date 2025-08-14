import { useState, useEffect } from "react";

const EditSkillModal = ({ isOpen, onClose, skill, updateSkill }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: "",
    startDate: "",
    targetGoal: ""
  });

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    }
  }, [skill]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSkill(skill._id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Skill</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} className="border w-full p-2 mb-2" placeholder="Title" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="border w-full p-2 mb-2" placeholder="Description"></textarea>
          <input name="coverImage" value={formData.coverImage} onChange={handleChange} className="border w-full p-2 mb-2" placeholder="Image URL" />
          <input name="startDate" type="date" value={formData.startDate?.split("T")[0]} onChange={handleChange} className="border w-full p-2 mb-2" />
          <input name="targetGoal" value={formData.targetGoal} onChange={handleChange} className="border w-full p-2 mb-2" placeholder="Target Goal" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkillModal;
