import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import Diary from './pages/Diary';
import React, { useReducer, useRef } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE': {
      //  [1,2,3,4,5] 3 이상의 숫자로 이루어진 배열에서 2를 더해서 반환해주세요 num >= 3 filter: 정한 조건에 의해 배열 반환받는거
      newState = state.filter((it) => it.id !== action.targeId);
      break;
    }
    case 'EDIT': {
      // [1,2,3,4,5] 이 배열의 숫자에 2를 더해주세요 map: 변환된 배열을 반환받는거
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      // 원래 기존 데이터랑 바꿀 데이터가 같은지 물어보고 같으면 바꿔서 반환하고 아니면 원래 데이터로 반환
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App({ pageProps }) {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
    // <DiaryStateContext.Provider value={data}>
    //   <DiaryDispatchContext.Provider
    //     value={{
    //       onCreate,
    //       onRemove,
    //       onEdit,
    //     }}
    //   >
    //     <BrowserRouter>
    //       <div className="App">
    //         <Routes>
    //           <Route path="/" element={<Home />} />
    //           <Route path="/new" element={<New />} />
    //           <Route path="/edit/:id" element={<Edit />} />
    //           <Route path="/diary/:id" element={<Diary />} />
    //         </Routes>
    //       </div>
    //     </BrowserRouter>
    //   </DiaryDispatchContext.Provider>
    // </DiaryStateContext.Provider>
  );
}

export default App;
