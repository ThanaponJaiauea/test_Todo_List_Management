import { Input } from "../Input";

export default function FormLogin({ input, handleChangeInput, error }) {
  return (
    <>
      <div>
        <label className="label_input">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="you@example.com"
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
          placeholder="••••••••"
          value={input.password}
          onChange={handleChangeInput}
          error={error.password}
        />
      </div>
    </>
  );
}
