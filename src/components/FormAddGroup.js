import { useState } from "react";

function FormAddGroup() {
  const [form, setForm] = useState({
    groupName: "",
    instructors: [],
    students: [],
  });
  return (
    <div>
      <form>
        {/* this is for when I add the authentication system here I will provide the admin ID */}
        <input type="hidden" value={""} />
      </form>
    </div>
  );
}

export default FormAddGroup;
