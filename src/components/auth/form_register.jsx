import { Input } from "../Input";

export default function FormRegister({ input, handleChangeInput, error }) {
  return (
    <>
      <div>
        <label className="label_input">Name</label>
        <Input
          name="firstName"
          type="text"
          placeholder="John Doe"
          value={input.firstName}
          onChange={handleChangeInput}
          error={error.firstName}
        />
      </div>

      <div>
        <label className="label_input">Last Name</label>
        <Input
          name="lastName"
          type="text"
          placeholder="Doe"
          value={input.lastName}
          onChange={handleChangeInput}
          error={error.lastName}
        />
      </div>

      <div>
        <label className="label_input">Mobile</label>
        <Input
          name="mobile"
          placeholder="0123456789"
          value={input.mobile}
          onChange={handleChangeInput}
          error={error.mobile}
        />
      </div>

      <div>
        <label className="label_input">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={handleChangeInput}
          error={error.email}
        />
      </div>

      <div>
        <label className="label_input">Password</label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChangeInput}
          error={error.password}
        />
      </div>

      <div>
        <label className="label_input">Confirm Password</label>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={handleChangeInput}
          error={error.confirmPassword}
        />
      </div>
    </>
  );
}
