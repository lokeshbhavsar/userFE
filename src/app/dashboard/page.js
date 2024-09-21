// app/redux-provider.js
"use client";
import { Provider } from "react-redux";
import dynamic from 'next/dynamic';
import { store } from "@/Redux/store/store";

const DashBoard = dynamic(() => import('../../../component/dashboard'), {
  loading: () => <div>Loading...</div>,
  ssr: false, 
});

export default function Home() {
  return (
    <Provider store={store}>
      <DashBoard />
    </Provider>
  )
}