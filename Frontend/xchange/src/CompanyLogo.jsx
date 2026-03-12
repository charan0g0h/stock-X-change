
function CompanyLogo({ domain }) {
  return (
    <img className="rounded-full"
      src={`https://img.logo.dev/${domain + ".com"}?token=pk_cr5V9c-3RDqb2DmpQacj4Q`}
      onError={(e) =>
        e.target.style.display = "none"
      }
    />
  );
}
export default CompanyLogo