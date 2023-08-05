import axios from "axios";

export default function Page({ data }) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4>Patient Profile</h4>
      </div>
      <div className="panel-body">
        <div className="box box-info">
          <div className="col-sm-5 col-xs-6 title ">First Name:</div>
          <div className="col-sm-7">{data.firstName}</div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">Last Name:</div>
          <div className="col-sm-7">{data.lastName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">Name of Disease:</div>
          <div className="col-sm-7">{data.disease}</div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">Guardian&apos;s Name:</div>
          <div className="col-sm-7">{data.guardianName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">
            Guardian&apos;s Phone Number:
          </div>
          <div className="col-sm-7">{data.guardianContact}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">How to give first aid:</div>
          <div className="col-sm-7">{data.firstAid}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">Doctor&apos;s Name:</div>
          <div className="col-sm-7">{data.doctorName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">
            Doctor&apos;s Phone Number:
          </div>
          <div className="col-sm-7">{data.doctorContact}</div>
        </div>
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const id = context.params.id;

  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/users/${id}`);

    return { props: { data: response.data } };
  } catch (err) {
    return {
      redirect: { destination: "/" },
    };
  }
}
