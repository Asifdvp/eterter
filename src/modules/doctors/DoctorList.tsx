import Container from "@/components/shared/Container";
import DoctorCard from "../home/components/DoctorCard";
import { getDoctors } from "@/lib/api";

const DoctorList = async () => {
  const doctors = await getDoctors();
  return (
    <Container>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {doctors.map((doctor) => (
          <DoctorCard layer={false} key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </Container>
  );
};

export default DoctorList;
