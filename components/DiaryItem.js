import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ id, emotion, content, date }) => {
  const env = process.env;
  env.PUBLIC_URl = env.PUBLIC_URl || '';

  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  // 글 눌렀을 때 일기 페이지로 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  // 수정하기 버튼 눌렀을 때 수정 페이지로 이동
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={['emotion_img_wrapper', `emotion_img_wrapper_${emotion}`].join(' ')}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_current_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={'수정하기'} />
      </div>
    </div>
  );
};
export default DiaryItem;
