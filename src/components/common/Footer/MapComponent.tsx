export default function MapComponent() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d239.70578348375565!2d-48.0580808836933!3d-15.998270734022405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1696434922663!5m2!1spt-BR!2sbr"
      width="320"
      height="220"
      /*       style={{ border: 0 }} */
      allowFullScreen={true}
      loading="lazy"
      className="max-[375px]:w-[290px] max-[375px]:h-auto max-[320px]:w-[260px]"
    />
  );
}
