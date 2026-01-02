import {useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { MdAlternateEmail } from "react-icons/md";

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 min-h-screen items-center justify-center">
          <img
            alt="Login illustration"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white&shade=600"
            className="h-48 w-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Faça login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-5" onSubmit={handleSubmit}>
            <div>
              {/* <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label> */}
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <MdAlternateEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-end">
                {/* <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label> */}
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  required
                  autoComplete="current-password"
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <HiOutlineLockClosed className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Entrando...' : 'Login'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Não tem uma conta?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
