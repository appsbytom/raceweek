type Props = {
  disclaimer: string
}

const Footer = ({ disclaimer }: Props) => (
  <footer className="mt-8 text-center border-t border-gray-300">
    <h1 className="mt-4 text-gray-600">{disclaimer}</h1>
  </footer>
)

export default Footer