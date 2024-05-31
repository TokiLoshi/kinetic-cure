// Note to self layouts do not rerender but templates with template.js do
// If you want to rerender the layout you need to use a template or if you want to use suspense

export default function DashboardLayout({ children }) {
	return (
		<>
			<section>{children}</section>
		</>
	);
}
