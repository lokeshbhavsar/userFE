// app/redux-provider.js
"use client";
import { Provider } from "react-redux";
import dynamic from 'next/dynamic';
import { store } from "@/Redux/store/store";

const Account = dynamic(() => import('../../../../component/account'), {
  loading: () => <div>Loading...</div>,
  ssr: true, 
});

export default function Home() {
  return (
    <Provider store={store}>
      <Account/>
    </Provider>
  )
}