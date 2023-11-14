import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <Link href="/login">
      <Button className="w-20">Login</Button>;
    </Link>
  );
};

export default Login;
