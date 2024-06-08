import s from './InputArea.module.css';
import { ForwardedRef, forwardRef } from 'react'


interface InputAreaProps {
	header?: string,
	type: 'name' // на будущее
	placeholder?: string
}


const InputArea = forwardRef((props: InputAreaProps, ref: ForwardedRef<HTMLInputElement>) => {
	const classes = `${s.inputArea} ${s[props.type]}`
	return (
		<div className={s.inputArea}>
			{ props.header && 
				<div className={s.header}>
					<p>{props.header}</p>
                </div>
			}
			<input ref={ref} className={classes} type="text" placeholder={props.placeholder}/>
		</div>
	)
})


export default InputArea