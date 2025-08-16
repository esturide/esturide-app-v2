import React from 'react';
import UserImage from '@assets/images/user.png';

interface PostProps {
  avatarSrc?: string;
  userName?: string;
  timestamp?: string;
  content?: string;
  likesCount?: number;
  commentsCount?: number;
}

export const PostCard: React.FC<PostProps> = ({
  avatarSrc = UserImage,
  userName = 'Pedro Ramírez',
  timestamp = '16 de marzo a las 12:00AM',
  content = 'Hola comunidad, empezaron las competencias de robótica en las explanadas de aulas amplias.',
  likesCount = 54,
  commentsCount = 17,
}) => {
  return (
    <article
      className="max-w-[335px]"
      role="article"
      aria-label={`Post by ${userName}`}
    >
      <div className="flex flex-col py-2.5 pr-14 pl-4 w-full bg-white rounded-2xl border-2 border-teal-800 border-solid">
        <header className="flex gap-3 self-start" role="banner">
          <img
            src={avatarSrc}
            alt={`${userName}'s profile picture`}
            className="object-contain shrink-0 aspect-[0.92] w-[35px]"
            role="img"
          />
          <div className="flex flex-col self-start">
            <h2 className="self-start text-base font-bold text-slate-800">
              {userName}
            </h2>
            <time
              className="text-xs font-light text-neutral-500"
              dateTime={timestamp}
            >
              {timestamp}
            </time>
          </div>
        </header>

        <section className="self-end text-sm text-black w-[251px]" role="main">
          <p>{content}</p>
        </section>

        <footer
          className="flex gap-5 justify-between self-center mt-5 max-w-full text-xs font-bold text-neutral-600 w-[142px]"
          role="contentinfo"
          aria-label="Post engagement metrics"
        >
          <div className="text-neutral-600" aria-label={`${likesCount} likes`}>
            {likesCount} Likes
          </div>
          <div
            className="text-neutral-600"
            aria-label={`${commentsCount} comments`}
          >
            {commentsCount} Comments
          </div>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
