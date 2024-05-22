import s from './InputArea.module.css';


interface InputAreaProps {
	header?: string,
	type: 'name' | 'comment', // на будущее
	placeholder?: string
}


const InputArea = (props: InputAreaProps) => {
	const classes = `${s.inputArea} ${s[props.type]}`
	return (
		<div className={s.inputArea}>
			{ props.header && 
				<div className={s.header}>
					<p>{props.header}</p>
                </div>
			}
			<input className={classes} type="text" placeholder={props.placeholder}/>
		</div>
	)
}


export default InputArea