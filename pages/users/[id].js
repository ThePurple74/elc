import axios from "axios";

export default function Page({ data }) {
  const callEmergency = async () => {
    //send message
    await axios.post(`/api/users/${data.id}/notify`);

    window.location.href = "tel:01066271353";
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4>환자 프로필</h4>
      </div>
      <div className="panel-body">
        <div className="box box-info">
          <div className="col-sm-5 col-xs-6 title ">이름:</div>
          <div className="col-sm-7">{data.firstName}</div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">성:</div>
          <div className="col-sm-7">{data.lastName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">병명:</div>
          <div className="col-sm-7">{data.disease}</div>
          <div className="clearfix"></div>
          <div className="bot-border"></div>

          <div className="col-sm-5 col-xs-6 title ">보호자명:</div>
          <div className="col-sm-7">{data.guardianName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">
            보호자 연락처:
          </div>
          <div className="col-sm-7">{data.guardianContact}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">응급시 조치 방법:</div>
          <div className="col-sm-7">{data.firstAid}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">주치의명:</div>
          <div className="col-sm-7">{data.doctorName}</div>

          <div className="clearfix"></div>
          <div className="bot-border"></div>
          <div className="col-sm-5 col-xs-6 title ">
            주치의 연락처:
          </div>
          <div className="col-sm-7">{data.doctorContact}</div>
        </div>
      </div>

      <div className="panel-footer" style={{ display: "flex", height: "70px" }}>
        <button style={{ flex: 1 }} onClick={callEmergency}>
          119 신고하기
        </button>
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
