import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FeedbackMessage } from "../components";
import { deleteUser, updateUser } from "../api";
import { paddedId, trimStringValues } from "../utils";

interface Props {
  user: User;
  /** Different for User Profile View and My Account View */
  isOwnAccount: boolean;
}
export default function UserProfile({ user, isOwnAccount }: Props) {
  const navigate = useNavigate();

  const blankFeedback: UserMessage = { text: "", isError: false };
  const [feedback, setFeedback] = useState(blankFeedback);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>{isOwnAccount ? "My Account" : "Staff Profile"}</h1>
        {!isOwnAccount && (
          <Button
            variant="danger"
            type="button"
            onClick={async () => await deleteUsr()}
          >
            Delete User
          </Button>
        )}
      </div>
      <FeedbackMessage message={feedback} />
      <UserForm
        user={user}
        isOwnAccount={isOwnAccount}
        setFeedback={setFeedback}
      />
    </>
  );

  async function deleteUsr() {
    if (
      !confirm(
        `Are you sure you want to delete ${user.role}:
          ${user.name}
          ${user.email}`
      )
    ) {
      return;
    }
    const success = await deleteUser(user.user_id);
    if (!success) {
      setFeedback({
        text: `Oops! The user couldn't be deleted. Try again in a few.`,
        isError: true,
      });
      return;
    }
    navigate({ to: "/users", replace: true });
  }
}

interface UFProps {
  user: Partial<User>;
  isOwnAccount: boolean;
  setFeedback: (msg: UserMessage) => void;
}
function UserForm({ user, isOwnAccount, setFeedback }: UFProps) {
  const initialFields: Partial<User> = {
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "",
  };
  const [fields, setFields] = useState(initialFields);

  const [passwords, setPasswords] = useState({ password: "", confirm: "" });

  const isPasswordChanged = passwords.password !== "";
  const isFormChanged =
    user.name !== fields.name ||
    user.email !== fields.email ||
    user.role !== fields.role ||
    isPasswordChanged;

  const navigate = useNavigate();

  return (
    <Form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) =>
        await saveEditedUser(e)
      }
    >
      <h4>ID: {paddedId(user.user_id)}</h4>
      <Form.Group className="mb-3">
        <Form.Label className="fst-italic">Full Name</Form.Label>
        <Form.Control
          id="input-name"
          name="name"
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          size="lg"
          className={
            fields.name?.trim() !== user.name ? "border-2 border-warning" : ""
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fst-italic">Email</Form.Label>
        <Form.Control
          id="input-email"
          name="email"
          type="email"
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          className={
            fields.email?.trim() !== user.email ? "border-2 border-warning" : ""
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fst-italic">Role</Form.Label>
        {
          // prevent user from accidentally un-admin-ing their self
          isOwnAccount ? (
            <Form.Control
              id="input-role"
              name="role"
              value={fields.role}
              readOnly
              className={
                fields.role?.trim() !== user.role
                  ? "border-2 border-warning"
                  : ""
              }
            />
          ) : (
            <Form.Select
              id="input-role"
              name="role"
              value={fields.role}
              // prevent user from accidentally un-admin-ing their self
              onChange={(e) =>
                setFields({ ...fields, role: e.target.value as UserRole })
              }
              className={
                fields.role?.trim() !== user.role
                  ? "border-2 border-warning"
                  : ""
              }
            >
              <option value="manager">manager</option>
              <option value="admin">admin</option>
            </Form.Select>
          )
        }
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fst-italic">New Password</Form.Label>
        <Form.Control
          id="input-password"
          name="password"
          type="password"
          minLength={6}
          maxLength={33}
          readOnly // this + onFocus = hack to stop autofilling of password
          onFocus={(e) => e.target.removeAttribute("readonly")}
          value={passwords.password}
          onChange={(e) =>
            setPasswords({ ...passwords, password: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="fst-italic">Confirm Password</Form.Label>
        <Form.Control
          id="input-confirm-password"
          name="confirm_password"
          type="password"
          readOnly // this + onFocus = hack to stop autofilling of password
          onFocus={(e) => e.target.removeAttribute("readonly")}
          value={passwords.confirm}
          onChange={(e) =>
            setPasswords({ ...passwords, confirm: e.target.value })
          }
        />
      </Form.Group>
      {isFormChanged && (
        <div className="d-flex gap-2 justify-content-between">
          <Button variant="warning" type="button" onClick={cancelEdit}>
            Discard Changes
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      )}
    </Form>
  );

  function cancelEdit() {
    setFields(initialFields);
    setPasswords({ password: "", confirm: "" });
    setFeedback({ text: "", isError: false });
  }

  async function saveEditedUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEntries = Object.fromEntries(
      new FormData(e.target)
    ) as Partial<User> & { password: string; confirm_password: string };
    trimStringValues(formEntries)
    const { name, email, role, password, confirm_password } = formEntries;
    if (!name || !email || !role) {
      setFeedback({
        text: "Name, Email, and Role are required.",
        isError: true,
      });
      return;
    } else {
      setFeedback({ text: "", isError: false });
    }
    if (password !== confirm_password) {
      setFeedback({ text: "Passwords don't match.", isError: true });
      return;
    } else {
      setFeedback({ text: "", isError: false });
    }
    if (
      !confirm(`Save changes?
        ${user.name} -> ${fields.name}
        ${user.email} -> ${fields.email}
        ${user.role} -> ${fields.role}
        password -> ${new Array(password.length).fill("*").join("")}`)
    ) {
      return;
    }
    const updatedUser = { name, email, role, password, user_id: user.user_id };
    const success = await updateUser(updatedUser);
    if (!success) {
      setFeedback({
        text: "Oops! The edits couldn't be saved. Try again in a few.",
        isError: true,
      });
      setFields(initialFields);
      return;
    }
    setFeedback({ text: "Successfully updated.", isError: false });
    setPasswords({ password: "", confirm: "" });
    navigate({ to: ".", replace: true });
  }
}
