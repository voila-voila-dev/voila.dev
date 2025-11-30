import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@voila.dev/ui/components/aspect-ratio";
import landscapeImage from "../assets/landscape.webp";

const meta = {
	title: "UI/AspectRatio",
	component: AspectRatio,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		ratio: {
			control: "select",
			options: ["16/9", "3/2", "4/3", "1/1"],
		},
	},
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		ratio: "16/9",
	},
	render: (args) => (
		<div className="w-lg">
			<AspectRatio ratio={args.ratio} className="rounded-lg">
				<img
					alt="Landscape"
					src={landscapeImage}
					className="h-full w-full object-cover rounded-lg"
				/>
			</AspectRatio>
		</div>
	),
};
