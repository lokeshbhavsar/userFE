// app/redux-provider.js
"use client";
import { Provider } from "react-redux";
import dynamic from 'next/dynamic';
import { store } from "@/Redux/store/store";

const Login = dynamic(() => import('../../component/login'), {
  loading: () => <div>Loading...</div>,
  ssr: true, 
});

export default function Home() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}
