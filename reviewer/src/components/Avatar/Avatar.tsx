import s from './Avatar.module.css'


interface AvatarProps {
	url?: string
}

const Avatar = (props: AvatarProps) => {
return (
	<div className={s.avatar}>
		<img src={props.url} alt='user logo'/>
	</div>
)
}


export default Avatar