import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Typography');

const { node, string, oneOf } = PropTypes;


export interface ITypographyProps {
	//* Can contain elements or nested \`Typography\` components. */
	children: React.ReactNode;

	/** Appended to the component-specific class names set on the root element. */
	className?: string;

	/** This prop defines the type of text that will be displayed. It may be an actual HTML element or something with extra semantic meaning. */
	variant: 'p'
		|	'tabular'
		|	'h1'
		|	'h2'
		|	'h3'
		|	'a'
		|	'pre'
		|	'code'
		|	'kbd'
		|	'samp';
}

class Typography extends React.Component<ITypographyProps, {}> {
	constructor(props: ITypographyProps) {
		super(props);

		this.displayName = 'Typography';
		this.peek = {
			description: `
				A general component for several types of textual HTML elements.
			`,
			categories: ['text'],
		};
		this.propTypes = {
			children: node`
				Can contain elements or nested \`Typography\` components.
			`,

			className: string`
				Appended to the component-specific class names set on the root element.
			`,

			variant: oneOf([
				'p',
				'tabular',
				'h1',
				'h2',
				'h3',
				'a',
				'pre',
				'code',
				'kbd',
				'samp',
			]).isRequired`
				This prop defines the type of text that will be displayed.
				It may be an actual HTML element or something with extra semantic meaning.
			`,
		};
	}

	displayName: string;
	peek: object;
	propTypes: object;

	elementTypes = {
		p: 'p',
		tabular: 'p',
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		a: 'a',
		pre: 'pre',
		code: 'code',
		kbd: 'kbd',
		samp: 'samp',
	};

	render() {
		const { children, className, variant, ...passThroughs } = this.props;
		const Element = this.elementTypes[variant];

		return (
			<Element
				{...omitProps(passThroughs, Typography)}
				className={cx('&', `&-${variant}`, className)}
			>
				{children}
			</Element>
		);
	}
};

export default Typography;