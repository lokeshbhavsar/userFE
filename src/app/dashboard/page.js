"use client";

import dynamic from 'next/dynamic';
import { Provider } from "react-redux";
import { store } from "@/Redux/store/store";
// Dynamically import the Signup component
const DashBoard = dynamic(() => import('../../../component/dashboard'), {
  ssr: true, // Disable server-side rendering for this component
});

export default function Page() {
  return (
    <div>
    <Provider store={store}>
      <DashBoard />
    </Provider>
    </div>
  );
}


