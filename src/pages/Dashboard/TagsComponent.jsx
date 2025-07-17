import React from "react";
import COUNTRIES from "./countries";
import { WithContext as ReactTags } from "react-tag-input";
// import "./TagStyles.css";
// Prepare suggestions
const suggestions = COUNTRIES.map((item) => ({
  id: item,
  text: item,
}));
const delimiters = [188, 13];
const TagsComponent = ({ tags, setTags }) => {
  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddition = (tag) => {
    if (tags.length < 7) {
      setTags([...tags, tag]);
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const onClearAll = () => {
    setTags([]);
  };

  return (
    <div className="my-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tags{" "}
        <span className="text-gray-400 text-xs">(Type and press enter)</span>
      </label>
      <div className="border rounded-lg px-3 py-2 bg-white">
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          inputFieldPosition="top"
          autocomplete
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
          delimiters={delimiters}
          classNames={{
            tags: "flex flex-col",
            tagInput: "mb-2",
            selected: "flex flex-wrap gap-2",
            tag: "bg-blue-200 text-blue-900 font-semibold px-2 py-1 rounded flex items-center",
            remove: "ml-2 text-red-600 cursor-pointer font-bold",
          }}
        />
      </div>
    </div>
  );
};

export default TagsComponent;
