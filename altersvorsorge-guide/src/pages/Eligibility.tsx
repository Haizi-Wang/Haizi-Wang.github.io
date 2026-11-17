import { Link } from "react-router-dom";

export default function Eligibility() {
  return (
    <>
      <header className="page-head">
        <h1>准入条件</h1>
        <p>
          谁可以开立认证养老投资账户并享受 Zulage：直接受惠与间接受惠如何区分，以及最低缴费与年龄等通用门槛。
        </p>
      </header>

      <article className="prose">
        <h2>直接受惠人群（Unmittelbar Förderberechtigte）</h2>
        <p>
          根据改革后对《所得税法》（EStG § 10a）相关规则的框架，在未满 67
          岁且满足相应条件时，下列群体通常属于可直接享受国家补贴与税前扣除路径的人群：
        </p>
        <ul>
          <li>
            <strong>法定养老保险强制参保人员</strong>
            ：在德国缴纳法定养老保险的雇员等。
          </li>
          <li>
            <strong>公务员、法官与军人</strong>
            ：领取联邦或各州薪饷的公职人员，以及享有相应公职抚恤保障的人员。
          </li>
          <li>
            <strong>自雇与自由职业者</strong>
            ：未满 67 岁，在缴费年度取得经营所得或自由职业所得，并依法提交该年度个人所得税申报的纳税人（改革后的重要扩展）。
          </li>
          <li>
            <strong>职业养老保障机构成员</strong>
            ：如医师、律师、建筑师等公会养老金库的强制成员（满足法定条件时）。
          </li>
          <li>
            <strong>育儿时间 / 无薪休假公职人员</strong>
            ：可认定 Kindererziehungszeiten 等情形。
          </li>
          <li>
            <strong>可比的外国法定养老保险参保人</strong>
            ：参加与德国法定养老保险相类似的体系，且在德国承担无限纳税义务者。
          </li>
        </ul>

        <h2>间接受惠人群（Mittelbar Zulageberechtigte）</h2>
        <p>
          若夫妻双方未长期分居、居住在欧盟/EWR，且一方属于直接受惠人群，另一方即使本身不符合直接资格，也可能通过配偶资格间接享受补贴（规则与额度以现行税法为准，旧制中间接补助常见上限表述为 175
          欧元量级——具体以官方当年规则核对）。
        </p>

        <h2>通用门槛</h2>
        <ul>
          <li>
            <strong>最低自付</strong>：自 2027
            缴费年度起，通常每年至少存入 <strong>120 欧元</strong>（约合每月 10
            欧元），才进入基本补助资格门槛之一。实际补助仍按缴费金额比例计算，并非存满 120
            欧元即可拿到最高补助。
          </li>
          <li>
            <strong>年龄</strong>
            ：对自雇、自由职业者及部分扩展人群，申请补贴的年龄前提多为未满 67 岁。
          </li>
        </ul>

        <div className="callout">
          <strong>25 岁以下 Berufseinsteiger-Bonus：</strong>
          缴费年度开始时未满 25 岁且符合资格的投保人，基础补贴可一次性额外增加 200
          欧元，注入认证养老账户（非现金打入私人银行卡）。全日制学生若未缴纳法定养老保险，通常暂不具备直接资格；通过有缴费义务的学生工等方式参保后可激活资格。
        </div>

        <p>
          下一步了解开户数量、缴费与补助如何计算：{" "}
          <Link to="/process">开户、缴费和补助 →</Link>
        </p>
      </article>
    </>
  );
}
