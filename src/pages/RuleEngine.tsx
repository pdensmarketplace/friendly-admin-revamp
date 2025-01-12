import { Button } from "@/components/ui/button";
import { RuleList } from "@/components/rule-engine/RuleList";
import { RuleForm } from "@/components/rule-engine/RuleForm";
import { useParams, useNavigate } from "react-router-dom";

interface RuleEnginePageProps {
  mode?: "view" | "create" | "edit";
}

const RuleEnginePage = ({ mode = "view" }: RuleEnginePageProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Rule Engine</h1>
        {mode === "view" && (
          <Button onClick={() => navigate("/rule-engine/create")}>
            Create New Rule
          </Button>
        )}
      </div>
      
      {mode === "view" ? (
        <RuleList />
      ) : (
        <RuleForm mode={mode} ruleId={id} />
      )}
    </div>
  );
};

export default RuleEnginePage;